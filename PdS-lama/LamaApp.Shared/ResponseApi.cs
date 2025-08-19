using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LamaApp.Shared
{
    public class ResponseApi<T>
    {
        public int statusCode { get; set; }
        public T? response { get; set; }
        public string? mensaje { get; set; }

    }
}
