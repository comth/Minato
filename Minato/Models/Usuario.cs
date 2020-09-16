using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Minato.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O Nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O Nome deve ter no máximo 100 caracteres.")]
        public string Nome { get; set; }

        public List<Endereco> Enderecos { get; set; }

        public List<Telefone> Telefones { get; set; }
    }

    public class Telefone
    {
        [Required(ErrorMessage = "O Telefone é obrigatório.")]
        [StringLength(11, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 10)]
        public string TelefoneString { get; set; } //trocar
    }
}
