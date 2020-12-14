using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : Controller
    {
        private readonly Context Context;
        private readonly PedidoBLL PedidoBLL;

        public PedidoController(Context context)
        {
            Context = context;
            PedidoBLL = new PedidoBLL();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(PedidoBLL.GetAll(Context));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Pedido pedido = PedidoBLL.Get(Context, id);

            return Ok(pedido);
        }

        [HttpGet("mesa/{idMesa}")]
        public IActionResult GetByMesa(int idMesa)
        {
            Pedido pedido = PedidoBLL.GetByMesa(Context, idMesa);

            return Ok(pedido);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Pedido pedido)
        {
            bool salvo = PedidoBLL.Post(Context, pedido);

            if (salvo)
            {
                return Ok();
            }

            return BadRequest(); 
        }

        [HttpPut]
        public IActionResult Put([FromBody] Pedido pedido)
        {
            bool salvo = PedidoBLL.Put(Context, pedido);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = PedidoBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
