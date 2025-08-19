using System.ComponentModel.DataAnnotations;

namespace LamaApp.Shared
{
    public class MotocicletaSh
    {
        public int IdMotocicleta { get; set; }

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "La marca debe tener entre 3 y 20 caracteres")]
        public string Marca { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "El modelo debe tener entre 3 y 20 caracteres")]
        public string Modelo { get; set; } = null!;

        [Required(ErrorMessage = "El campo es obligatorio.")]
        public int Cilindrada { get; set; }

        [Required(ErrorMessage = "El campo es obligatorio.")]
        [StringLength(10, MinimumLength = 6, ErrorMessage = "La placa debe tener entre 3 y 10 caracteres")]
        public string Placa { get; set; } = null!;


    }


}


