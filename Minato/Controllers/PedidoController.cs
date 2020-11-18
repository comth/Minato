using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : Controller
    {
        private readonly Context Context;
        private readonly PedidoBLL PedidoBLL;

        public PedidoController(Context context, PedidoBLL pedidoBLL)
        {
            Context = context;
            PedidoBLL = pedidoBLL;
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

            if (pedido == null)
            {
                return NotFound();
            }

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
