using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : Controller
    {
        private readonly Context Context;
        private readonly StatusBLL StatusBLL;

        public StatusController(Context context)
        {
            Context = context;
            StatusBLL = new StatusBLL();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(StatusBLL.GetAll(Context));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Status status = StatusBLL.Get(Context, id);

            if (status == null)
            {
                return NotFound();
            }

            return Ok(status);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Status status)
        {
            bool salvo = StatusBLL.Post(Context, status);

            if (salvo)
            {
                return Ok();
            }

            return Conflict();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Status status)
        {
            bool salvo = StatusBLL.Put(Context, status);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = StatusBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
