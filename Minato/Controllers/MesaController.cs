using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MesaController : Controller
    {
        private readonly Context Context;
        private readonly MesaBLL MesaBLL;

        public MesaController(Context context)
        {
            Context = context;
            MesaBLL = new MesaBLL();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(MesaBLL.GetAll(Context));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Mesa mesa = MesaBLL.Get(Context, id);

            if (mesa == null)
            {
                return NotFound();
            }

            return Ok(mesa);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Mesa mesa)
        {
            bool salvo = MesaBLL.Post(Context, mesa);

            if (salvo)
            {
                return Ok();
            }

            return Conflict();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Mesa mesa)
        {
            bool salvo = MesaBLL.Put(Context, mesa);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = MesaBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
