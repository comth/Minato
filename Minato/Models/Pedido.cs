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
        public int IdPedido { get; set; }

        [Key]
        public DateTime DataPedido { get; set; } = DateTime.Now;

        public int IdUsuario { get; set; }
        [Required(ErrorMessage = "O Usuário é obrigatório.")]
        public Usuario Usuario { get; set; }

        public int IdEndereco { get; set; }
        [Required(ErrorMessage = "O Endereço é obrigatório.")]
        public Endereco EnderecoSelecionado { get; set; }

        [EnsureMinimumElements(1, ErrorMessage = "Ao menos 1 produto é necessário")]
        public List<Produto> Produtos { get; set; }
    }
}
