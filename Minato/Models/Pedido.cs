using Minato.Enums;
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
        public Mesa Mesa { get; set; }

        public string Observacao { get; set; }
        public bool PedidoEncerrado { get; set; }
        public TipoPedido TipoPedido { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal PrecoEntrega { get; set; } 

        [Column(TypeName = "decimal(7, 2)")]
        public decimal Preco { get; set; } //inclui o preço da entrega
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
