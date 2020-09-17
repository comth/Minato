using Minato.BLLs;
using Minato.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Minato.Controllers
{
    public class UsuarioController
    {
        private readonly Context context;
        private readonly UsuarioBLL usuarioBLL;

        public UsuarioController(Context context, UsuarioBLL usuarioBLL)
        {
            this.context = context;
            this.usuarioBLL = usuarioBLL;
        }
    }
}
