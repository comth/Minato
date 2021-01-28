using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
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
            return context.Pedido.ToList();
        }

        public Pedido Get(Context context, int id)
        {
            return context.Pedido.Find(id);
        }

        public bool Post(Context context, Pedido pedido)
        {
            if (!pedido.PedidoLocal && (pedido.Usuario == null && pedido.EnderecoSelecionado == null))
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
                pedido.Produtos[i].Produto = context.Produto.Find(pedido.Produtos[i].Produto.IdBanco);
            }

            context.Pedido.Add(pedido);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Pedido pedido)
        {
            if (Exists(context, pedido.Id))
            {
                context.Entry(pedido).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        internal Pedido GetByMesa(Context context, int idMesa)
        {
            Pedido pedido = context.Mesa.Include(x => x.Pedido).First(x => x.Id.Equals(idMesa)).Pedido;
            pedido = context.Pedido.Include(x => x.EnderecoSelecionado).Include(x => x.Produtos).FirstOrDefault(x => x.Id == pedido.Id);
            for (int i = 0; i < pedido.Produtos.Count; i++)
            {
                pedido.Produtos[i] = context.ProdutoPedido.Include(x => x.Produto).FirstOrDefault(x => x.Id == pedido.Produtos[i].Id);
            }
            return pedido;
        }

        public bool Exists(Context context, int idPedido)
        {
            return context.Pedido.Any(x => x.Id.Equals(idPedido));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Pedido pedido = new Pedido() { Id = id };
                context.Pedido.Attach(pedido);
                context.Pedido.Remove(pedido);
                context.SaveChanges();
                return true;
            }
            return false;
        }  
    }
}
