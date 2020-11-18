using Minato.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Minato.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        [Key]
        public DateTime DataPedido { get; set; } = DateTime.Now;

        //[Required(ErrorMessage = "O Usuário é obrigatório.")]
        public Usuario Usuario { get; set; }

        //[Required(ErrorMessage = "O Endereço é obrigatório.")]
        public Endereco EnderecoSelecionado { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "Ao menos 1 produto é necessário")]
        public List<Produto> Produtos { get; set; }

        //pedido que foi feito na mesa, ou com retirada no local
        public bool PedidoLocal { get; set; }
    }
}
