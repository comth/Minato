using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;

namespace Minato.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly Context Context;
        private readonly UsuarioBLL UsuarioBLL;
        private readonly string CabecalhoMensagem = "O Usuário"; //para não ter que mudar a mensagem ??

        public UsuarioController(Context context, UsuarioBLL usuarioBLL)
        {
            Context = context;
            UsuarioBLL = usuarioBLL;
        }

        [HttpGet("{itensPagina}/{index}")]
        public IActionResult GetAll(int itensPagina, int index)
        {
            return Ok(UsuarioBLL.GetAll(Context, itensPagina, index));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Usuario usuario = UsuarioBLL.Get(Context, id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpGet("filtrar/{itensPagina}/{index}/{pesquisa}")]
        public IActionResult Filtrar(int itensPagina, int index, string pesquisa)
        {
            List<Usuario> lista = UsuarioBLL.Filtrar(Context, itensPagina, index, pesquisa);

            return Ok(lista);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            bool salvo = UsuarioBLL.Post(Context, usuario);

            if (salvo)
            {
                return Ok();
            }

            return Conflict(); //por telefone????
        }

        [HttpPut]
        public IActionResult Put([FromBody] Usuario usuario)
        {
            bool salvo = UsuarioBLL.Put(Context, usuario);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = UsuarioBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
