using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Pareja
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdPareja { get; set; }

    public string Nombre { get; set; } = null!;
    public string Cedula { get; set; } = null!;

    // Relación uno a uno con Usuario
    public int IdUsuario { get; set; }
    public virtual Usuario Usuario { get; set; } = null!;
}
