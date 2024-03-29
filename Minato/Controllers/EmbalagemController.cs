﻿using Microsoft.AspNetCore.Mvc;
using Minato.BLLs;
using Minato.Contexts;
using Minato.Models;

namespace Minato.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmbalagemController : Controller
    {
        private readonly Context Context;
        private readonly EmbalagemBLL EmbalagemBLL;

        public EmbalagemController(Context context)
        {
            Context = context;
            EmbalagemBLL = new EmbalagemBLL();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(EmbalagemBLL.GetAll(Context));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Embalagem embalagem = EmbalagemBLL.Get(Context, id);

            if (embalagem == null)
            {
                return NotFound();
            }

            return Ok(embalagem);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Embalagem embalagem)
        {
            EmbalagemBLL.Post(Context, embalagem);
            return Ok();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Embalagem embalagem)
        {
            bool salvo = EmbalagemBLL.Put(Context, embalagem);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool salvo = EmbalagemBLL.Delete(Context, id);

            if (salvo)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
