using LamaApp.Shared;

namespace LamaApp.Client.Services.Evento
{
    public interface IEventoService
    {
        Task<List<EventoSh>> GetEventos();
        Task<EventoSh> AddEvento(EventoSh evento);
        Task<EventoSh> UpdateEvento(EventoSh evento);
        Task<ResponseApi<bool>> deleteEvento(int idEvento);

    }
}
