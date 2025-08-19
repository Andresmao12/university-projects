using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LamaApp.Shared
{
    public class Estadisticas
    {
        public int TotalUsuarios { get; set; }

        public int TotalCapitulos { get; set; }

        public List<CapituloSh> listaCapitulos  { get; set;}
        public string CapituloConMasUsuarios { get; set; }

        public int TotalEventos { get; set; }
        public int EventosEsteMes { get; set; }

        public List<string> usuariosPorCapitulo { get; set; }
        public List<string> eventosPorCapitulo { get; set; }
        public List<string> ActividadReciente { get; set; }






    }
}
