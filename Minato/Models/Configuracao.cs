using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minato.Models
{
    public class Configuracao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //public string NomeExibicao { get; set; } 

        public Status StatusInicioPedido { get; set; }  //status da mesa após pedido
        public Status StatusFinalPedido { get; set; }  //status da mesa após pedido
    }
}
