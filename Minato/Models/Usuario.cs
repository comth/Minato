using Minato.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minato.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "O Nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O Nome deve ter no máximo 100 caracteres.")]
        public string Nome { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "Ao menos 1 endereço é necessário")]
        public List<Endereco> Enderecos { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "Ao menos 1 telefone é necessário")]
        public List<Telefone> Telefones { get; set; }
    }

    public class Telefone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "O Telefone é obrigatório.")]
        [StringLength(11, ErrorMessage = "O telefone deve ter entre 10 e 11 caracteres", MinimumLength = 10)]
        [RegularExpression("^[0-9]*$", ErrorMessage = "O telefone só pode conter números")]
        public string Value { get; set; }

        //public Usuario Usuario { get; set; }
    }
}
