using Minato.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minato.Models
{
    public class Pedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "Ao menos 1 produto é necessário")]
        public List<ProdutoPedido> Produtos { get; set; }

        public DateTime DataPedido { get; set; } = DateTime.Now;
        public Usuario Usuario { get; set; }
        public Endereco EnderecoSelecionado { get; set; }

        [Column(TypeName = "decimal(3, 2)")]
        public decimal PrecoEntrega { get; set; }
        public string Observacao { get; set; }
        public bool PedidoDelivery { get; set; }
        public bool PedidoRetirada { get; set; }
        public bool PedidoLocal { get; set; }
        public bool PedidoEncerrado { get; set; }
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

        [StringLength(60, ErrorMessage = "A Observação deve ter no máximo 60 caracteres.")]
        public string Observacao { get; set; }

        [NotMapped]
        public decimal Preco { get; set; }
    }
}
