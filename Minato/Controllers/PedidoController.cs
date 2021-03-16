using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Enums;
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

        [HttpGet("especifico/{tipoPedido}/{mostrarFechados}")]
        public IActionResult GetEspecifico(TipoPedido tipoPedido, bool mostrarFechados)
        {
            return Ok(PedidoBLL.GetEspecifico(Context, tipoPedido, mostrarFechados));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Pedido pedido = PedidoBLL.Get(Context, id);

            return Ok(pedido);
        }

        [HttpPost("{idMesa}")]
        public IActionResult Post([FromBody]Pedido pedido, int idMesa)
        {
            bool salvo = PedidoBLL.Post(Context, pedido, idMesa);

            if (salvo)
            {
                return Ok(new { id = pedido.Id });
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult Put([FromBody]Pedido pedido)
        {
            bool salvo = PedidoBLL.Put(Context, pedido);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpPut("encerrar/{id}")]
        public IActionResult EncerrarPedido(int id)
        {
            bool salvo = PedidoBLL.EncerrarPedido(Context, id, true);

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
