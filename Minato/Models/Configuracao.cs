using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minato.Models
{
    public class Configuracao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(60, ErrorMessage = "O Nome deve ter no máximo 60 caracteres.")]
        public string NomeExibicao { get; set; } 
        public string KeyDistanceMatrix { get; set; }

        [StringLength(8, ErrorMessage = "O CEP deve ter 8 caracteres.")]
        public string CepRestaurante { get; set; }

        public bool CobrarEntrega { get; set; }

        public bool EntregaFixa { get; set; }

        [Column(TypeName = "decimal(3, 2)")]
        public decimal ValorEntregaFixa { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal PrecoPorKm { get; set; }
        public bool CobrarPorcentGar { get; set; } //cobrar porcentagem garçom

        [Column(TypeName = "decimal(5, 2)")]
        public decimal PorcentGar { get; set; }
        public Status StatusInicioPedido { get; set; }  //status da mesa após pedido
        public Status StatusFinalPedido { get; set; }  //status da mesa após pedido
    }
}
