using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Minato.Util
{
    public class EnsureMinimumElements : ValidationAttribute
    {
        private readonly int minElements;
        public EnsureMinimumElements(int minElements)
        {
            this.minElements = minElements;
        }

        public override bool IsValid(object value)
        {
            var list = value as IList;
            if (list != null)
            {
                return list.Count >= minElements;
            }
            return false;
        }
    }
}
