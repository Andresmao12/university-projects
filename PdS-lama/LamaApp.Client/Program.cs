using LamaApp.Client;
using LamaApp.Client.Services.Capitulos;
using LamaApp.Client.Services.Admin;
using LamaApp.Client.Services.Usuario;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using LamaApp.Client.Services.Evento;
using LamaApp.Client.Services.Publicacion;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("https://lamaappserver20241124135014.azurewebsites.net/") });

builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<ICapituloService, CapituloService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IPublicacionService, PublicacionService>();

await builder.Build().RunAsync();
