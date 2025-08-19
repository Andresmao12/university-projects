export const permissions = {
    admin: [
        'Indicador',
        'tipo_indicador',
        'reprensentacion_visual',
        'tipo_actor',
        'fuente',
        'unidad_medicion',
        'sentido',
        'frecuencia',
        'representvisualporindicador',
        'responsablesporindicador',
        'actor',
        'fuentes_por_indicador',
        'variablesporindicador',
        'variable',
        'Usuarios',
    ],
    Verificador: ['Indicador', 'fuente', 'unidad_medicion', 'tipo_indicador',
        'reprensentacion_visual', 'variable'],
    invitado: ['Indicador', 'fuente', 'unidad_medicion', 'variable', 'variablesporindicador'],
    Validador: ['Indicador', 'tipo_indicador', 'fuente', 'actor'],
    Administrativo: ['Indicador', 'tipo_indicador', 'fuente', 'fuentes_por_indicador',
        'variablesporindicador', 'variable']
};


export const CONSULTAS = [
    {
        id: 1,
        nombre: "Listado completo de indicadores",
        descripcion: "Muestra todos los campos de la tabla indicador, incluyendo tipo, sentido y unidad de medición"
    },
    {
        id: 2,
        nombre: "Indicadores con representación visual",
        descripcion: "Muestra información básica de indicadores incluyendo su representación visual"
    },
    {
        id: 3,
        nombre: "Indicadores con responsables",
        descripcion: "Muestra información básica de indicadores incluyendo los actores responsables"
    },
    {
        id: 4,
        nombre: "Indicadores con fuentes de datos",
        descripcion: "Muestra información básica de indicadores incluyendo sus fuentes asociadas"
    },
    {
        id: 5,
        nombre: "Indicadores con variables y datos",
        descripcion: "Muestra información básica de indicadores incluyendo variables con sus datos y fechas"
    },
    {
        id: 6,
        nombre: "Resultados de indicadores",
        descripcion: "Muestra los resultados calculados para cada indicador con sus fechas"
    }
];