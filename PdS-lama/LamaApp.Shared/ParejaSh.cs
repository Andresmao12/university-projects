using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LamaApp.Shared
{
    public class ParejaSh
    {

        public int IdPareja { get; set; }

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "El nombre debe tener entre 3 y 50 caracteres")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "La cedula debe tener entre 5 y 20 caracteres")]
        [RegularExpression(@"^\d+$", ErrorMessage = "La cédula debe contener solo números.")]
        public string Cedula { get; set; } = null!;

    }
}
