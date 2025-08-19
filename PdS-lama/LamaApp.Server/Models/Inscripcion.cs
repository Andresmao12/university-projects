using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LamaApp.Server.Models;

public partial class Inscripcion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdInscripcion { get; set; }

    public DateTime FechaCompra { get; set; }

    public int IdEvento { get; set; }

    public int IdUsuario { get; set; }

    [ForeignKey(nameof(IdEvento))]
    public virtual Evento Evento { get; set; } = null!;

    [ForeignKey(nameof(IdUsuario))]
    public virtual Usuario Usuario { get; set; } = null!;
}
