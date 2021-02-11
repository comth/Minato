using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : Controller
    {
        private readonly Context Context;
        private readonly UsuarioBLL UsuarioBLL;

        public UsuarioController(Context context)
        {
            Context = context;
            UsuarioBLL = new UsuarioBLL();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(UsuarioBLL.GetAll(Context));
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

        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            bool salvo = UsuarioBLL.Post(Context, usuario);

            if (salvo)
            {
                return Ok();
            }

            return Conflict();
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
