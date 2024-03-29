﻿using Microsoft.EntityFrameworkCore;
using Minato.Contexts;
using Minato.Models;
using System.Collections.Generic;
using System.Linq;

namespace Minato.BLLs
{
    public class StatusBLL
    {
        public List<Status> GetAll(Context context)
        {
            var status = context.Status.ToList();

            foreach (var s in status)
            {
                s.Quantidade = context.Mesa.Count(x => x.Status.Id == s.Id);
            }

            return status;
        }

        public Status Get(Context context, int id)
        {
            return context.Status.Find(id);
        }

        public bool Post(Context context, Status status)
        {
            context.Status.Add(status);
            context.SaveChanges();
            return true;
        }

        public bool Put(Context context, Status status)
        {
            if (Exists(context, status.Id))
            {
                context.Entry(status).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Exists(Context context, int id)
        {
            return context.Status.Any(x => x.Id.Equals(id));
        }

        public bool Delete(Context context, int id)
        {
            if (Exists(context, id))
            {
                Status status = new Status() { Id = id };
                context.Status.Attach(status);
                context.Status.Remove(status);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
