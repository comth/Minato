﻿using System.ComponentModel.DataAnnotations;

namespace Minato.Models
{
    public class Produto
    {
        [Key]
        public int IdProduto { get; set; }

        [Required(ErrorMessage = "O Nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O Nome deve ter no máximo 100 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O Preço é obrigatório.")]
        public decimal? Preco { get; set; }
    }
}
