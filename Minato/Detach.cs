using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System;
using System.Linq;

namespace Minato
{
    public static class Detach
    {
        public static void DetachLocal(Context context, Func<T, bool> predicate)
            //where T : class, IIdentifier
        {
            var local = context.Set<T>().Where(predicate).FirstOrDefault();
            if (local != null)
            {
                context.Entry(local).State = EntityState.Detached;
            }
        }
    }

    public interface T
    {
        public int Id { get; set; }
    }

}
