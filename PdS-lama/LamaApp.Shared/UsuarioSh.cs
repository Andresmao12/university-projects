using System.ComponentModel.DataAnnotations;
using System;

namespace LamaApp.Shared {

    public class UsuarioSh
    {
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
        [StringLength(50, ErrorMessage = "El nombre de usuario no puede exceder los 50 caracteres")]
        public string NombreUsuario { get; set; } = null!;

        [Required(ErrorMessage = "La contraseña es obligatoria.")]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "La contraseña debe tener entre 6 y 20 caracteres")]
        public string Contraseña { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(60, MinimumLength = 6, ErrorMessage = "El nombre debe tener entre 3 y 60 caracteres")]
        public string Nombre { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(60, MinimumLength = 6, ErrorMessage = "El apellido debe tener entre 3 y 60 caracteres")]
        public string Apellido { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "La cedula debe tener entre 3 y 20 caracteres")]
        [RegularExpression(@"^\d+$", ErrorMessage = "La cédula debe contener solo números.")]
        public string Cedula { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        public DateTime FechaNacimiento { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        public DateTime FechaRegistro { get; set; } 

        public int IdContacto { get; set; }

        public int IdPareja { get; set; }


        [Required(ErrorMessage = "El campo es obligatorio.")]
        public int IdCapitulo { get; set; }

        public int IdMotocicleta { get; set; }


        public ContactoSh Contacto { get; set; } = null!;


        public ParejaSh Pareja { get; set; } = null!;

        public MotocicletaSh Motocicleta { get; set; } = null!;

    }

}

