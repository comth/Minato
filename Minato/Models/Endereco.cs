using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Minato.Models
{
    public class Endereco
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "O Bairro é obrigatório.")]
        [StringLength(60, ErrorMessage = "O Bairro deve ter no máximo 60 caracteres.")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "O CEP é obrigatório")]
        [StringLength(8, ErrorMessage = "O CEP deve ter 8 caracteres.")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "O Logradouro é obrigatório.")]
        [StringLength(80, ErrorMessage = "O Logradouro deve ter no máximo 80 caracteres.")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "O Complemento é obrigatório.")]
        [StringLength(60, ErrorMessage = "O Complemento deve ter no máximo 60 caracteres.")]
        public string Complemento { get; set; }

        [StringLength(80, ErrorMessage = "A Observação deve ter no máximo 80 caracteres.")]
        public string Observacao { get; set; }

        [Required(ErrorMessage = "O UF é obrigatório.")]
        [StringLength(2, ErrorMessage = "O UF deve ter no máximo 2 caracteres.")]
        public string Uf { get; set; }
    }
}
