using System.ComponentModel.DataAnnotations;

namespace LamaApp.Shared
{
    public class PublicacionSh
        {
            public int IdPublicacion { get; set; }
            public DateTime Fecha { get; set; } = DateTime.Now;

            [Required(ErrorMessage = "No hay contenido para publicar")]
            public string Contenido { get; set; }
            public string? urlImagen { get; set; } = null;

            public int numeroLikes { get; set; } = 0;
            public int IdUsuario { get; set; }

        }


}



