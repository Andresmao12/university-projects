using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LamaApp.Shared
{
    public class ContactoSh
    {
        public int IdContacto { get; set; }

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "La direccion debe tener entre 3 y 50 caracteres")]
        public string Direccion { get; set; }

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(50, MinimumLength = 10, ErrorMessage = "El correo debe tener entre 10 y 50 caracteres")]
        public string Correo { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "El celular debe tener entre 3 y 20 caracteres")]
        [RegularExpression(@"^\d+$", ErrorMessage = "La cédula debe contener solo números.")]
        public string Celular { get; set; } = null!;

    }
}
