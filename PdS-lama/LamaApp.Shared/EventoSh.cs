namespace LamaApp.Shared
{
    public class EventoSh
    {
        public int IdEvento { get; set; }
        public string Titulo { get; set; } = null!;

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }

        public string Ubicacion { get; set; } = null!;

        public string Creador { get; set; } = null!;

        public string Descripcion { get; set; } = null!;

        public int IdCapitulo { get; set; }


    }

}


