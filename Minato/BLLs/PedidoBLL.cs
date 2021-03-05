using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Enums;
using Minato.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class PedidoBLL
    {
        public List<Pedido> GetAll(Context context)
        {
            return context.Pedido.Select(x => new Pedido()
            {
                Id = x.Id,
                DataPedido = x.DataPedido,
                PedidoEncerrado = x.PedidoEncerrado,
                PrecoEntrega = x.PrecoEntrega,
                EnderecoSelecionado = x.EnderecoSelecionado,
                Observacao = x.Observacao,
                Usuario = new Usuario{ Nome = x.Usuario.Nome, Telefones = x.Usuario.Telefones },
                Preco = x.Preco
            }).ToList(); 
        }

        public List<Pedido> GetEspecifico(Context context, TipoPedido tipoPedido)
        {
            return context.Pedido.Select(x => new Pedido()
            {
                Id = x.Id,
                DataPedido = x.DataPedido,
                PedidoEncerrado = x.PedidoEncerrado,
                EnderecoSelecionado = x.EnderecoSelecionado,
                Observacao = x.Observacao,
                Usuario = new Usuario { Nome = x.Usuario.Nome, Telefones = x.Usuario.Telefones },
                Preco = x.Preco
            }).Where(x => x.TipoPedido == tipoPedido).ToList();
        }

        public Pedido Get(Context context, int id)
        {
            Pedido pedido = context.Pedido.Select(x => new Pedido()
            {
                Id = x.Id,
                DataPedido = x.DataPedido,
                PedidoEncerrado = x.PedidoEncerrado,
                Produtos = x.Produtos,
                PrecoEntrega = x.PrecoEntrega,
                EnderecoSelecionado = x.EnderecoSelecionado,
                Observacao = x.Observacao,
                Usuario = x.Usuario != null ? new Usuario { Id = x.Usuario.Id, Nome = x.Usuario.Nome } : null,
                Preco = x.Preco
            }).AsSplitQuery().First(x => x.Id == id);

            pedido.Produtos.ForEach(produtoPedido => {
                produtoPedido = context.ProdutoPedido.Include(x => x.Produto).AsSplitQuery().First(x => x.Id == produtoPedido.Id);
            });

            return pedido;
        }

        public bool Post(Context context, Pedido pedido, int idMesa)
        {
            Mesa mesa = null;
            if(idMesa != 0) mesa = context.Mesa.Find(idMesa);

            if (pedido.TipoPedido == TipoPedido.Delivery && (pedido.Usuario == null && pedido.EnderecoSelecionado == null))
                return false;

            if (pedido.Usuario != null)
            {
                pedido.Usuario = context.Usuario.Find(pedido.Usuario.Id);
            }

            if (pedido.EnderecoSelecionado != null)
            {
                pedido.EnderecoSelecionado = context.Endereco.Find(pedido.EnderecoSelecionado.Id);
            }

            for (int i = 0; i < pedido.Produtos.Count; i++)
            {
                pedido.Produtos[i].Produto = context.Produto
                    .Include(x => x.Embalagem)
                    .First(x => x.IdBanco == pedido.Produtos[i].Produto.IdBanco);
            }

            Math.Round(pedido.PrecoEntrega, 2);

            pedido.Preco = TratarPreco(pedido);

            if (mesa != null) {
                mesa.Pedido = pedido;
                var config = new ConfiguracaoBLL().Get(context);
                mesa.Status = config.StatusInicioPedido;
            }
            context.Pedido.Add(pedido);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Pedido pedido)
        {
            if (Exists(context, pedido.Id))
            {
                var pedidoBanco = context.Pedido.Find(pedido.Id);

                if (pedido.Usuario != null)
                {
                    pedidoBanco.Usuario = context.Usuario.Find(pedido.Usuario.Id);
                }

                if (pedido.EnderecoSelecionado != null)
                {
                    pedidoBanco.EnderecoSelecionado = context.Endereco.Find(pedido.EnderecoSelecionado.Id);
                }

                for (int i = 0; i < pedido.Produtos.Count; i++)
                {
                    pedido.Produtos[i].Produto = context.Produto
                        .Include(x => x.Embalagem)
                        .First(x => x.IdBanco == pedido.Produtos[i].Produto.IdBanco);
                }

                pedidoBanco.Produtos = pedido.Produtos;
                pedidoBanco.Observacao = pedido.Observacao;
                pedidoBanco.PedidoEncerrado = pedido.PedidoEncerrado;
                pedidoBanco.PrecoEntrega = pedido.PrecoEntrega;
                pedidoBanco.Preco = TratarPreco(pedido);

                Math.Round(pedidoBanco.PrecoEntrega, 2);

                if (pedido.PedidoEncerrado) EncerrarPedido(context, pedido.Id);

                context.SaveChanges();
                return true;
            }
            return false;
        }

        private decimal TratarPreco(Pedido pedido)
        {
            decimal precoProdutos = 0;

            foreach (var produtoPedido in pedido.Produtos)
            {
                decimal precoProdutoPedido = 0;
                if (pedido.TipoPedido == TipoPedido.Delivery || pedido.TipoPedido == TipoPedido.TakeAway)
                {
                    precoProdutoPedido = produtoPedido.Produto.Preco + produtoPedido.Produto.Embalagem.Preco;
                } 
                else
                {
                    precoProdutoPedido = produtoPedido.Produto.Preco;
                }
                precoProdutos = precoProdutos + (precoProdutoPedido * produtoPedido.Quantidade);
            }

            return precoProdutos + pedido.PrecoEntrega;
        }

        public bool EncerrarPedido(Context context, decimal id)
        {
            var mesa = context.Mesa.First(x => x.Pedido.Id == id);
            mesa.Pedido = null;
            var config = new ConfiguracaoBLL().Get(context);
            mesa.Status = config.StatusFinalPedido;
            return true;
        }

        public bool Exists(Context context, int idPedido)
        {
            return context.Pedido.Any(x => x.Id.Equals(idPedido));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                if(context.Mesa.Any(x => x.Pedido.Id == id))
                {
                    return false; //caso a mesa esteja ligado a esse pedido
                }

                Pedido pedido = context.Pedido.Include(x => x.Produtos).First(x => x.Id == id);

                foreach (ProdutoPedido produtoPedido in pedido.Produtos)
                {
                    context.ProdutoPedido.Remove(produtoPedido);
                }

                context.Pedido.Remove(pedido);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
