using Minato.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minato.Models
{
    public class Pedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Key]
        public DateTime DataPedido { get; set; } = DateTime.Now;

        //[Required(ErrorMessage = "O Usuário é obrigatório.")]
        public Usuario Usuario { get; set; }

        //[Required(ErrorMessage = "O Endereço é obrigatório.")]
        public Endereco EnderecoSelecionado { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "Ao menos 1 produto é necessário")]
        public List<ProdutoPedido> Produtos { get; set; }

        //pedido que foi feito na mesa, ou com retirada no local
        public bool PedidoLocal { get; set; }
    }

    public class ProdutoPedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public Produto Produto { get; set; }

        [Required]
        public int Quantidade { get; set; }
        public string Observacao { get; set; }
    }
}
