using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Motocicleta
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdMotocicleta { get; set; }

    public string Marca { get; set; } = null!;
    public string Modelo { get; set; } = null!;
    public int Cilindrada { get; set; }
    public string Placa { get; set; } = null!;

    // Relación uno a uno con Usuario
    public int IdUsuario { get; set; }
    public virtual Usuario Usuario { get; set; } = null!;
}
