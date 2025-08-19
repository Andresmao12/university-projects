using LamaApp.Shared;

namespace LamaApp.Client.Services.Admin
{
    public interface IAdminService
    {
        Task<Estadisticas> getStats();

    }
}
