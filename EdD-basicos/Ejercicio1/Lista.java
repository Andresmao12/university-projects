package Ejercicio1;

import java.io.IOException;

public class Lista {

    public static Nodo cabeza, cola;

    static class Nodo {

        public Nodo siguiente;
        public Nodo anterior;

        private Trabajador trabajador;

        public Nodo(Trabajador dato) {
            trabajador = dato;
        }
    }

    public static void crear() {

        if (cabeza == null) {
            cabeza = new Nodo(new Trabajador("", "", 0, ""));
        }

    }

    public static boolean vacio() {
        crear();

        if (cabeza.siguiente == null || cabeza.siguiente == cabeza) {
            return true;
        }

        return false;
    }

    public static void insertar() throws IOException {

        General.imprimir("\t--- INGRESO NUEVO TRABAJADOR ---");

        String nombre = General.leer("Nombre: ", false);
        String cedula = General.leer("Cedula: ", false);
        double salario;

        while (true) {
            try {
                salario = Double.parseDouble(General.leer("Salario inicial: ", false));
                break;
            } catch (Exception e) {
                General.imprimir("-- Ingrese un numero valido --");
            }
        }

        String genero;

        while (true) {
            try {

                genero = General.leer("Genero (M o F): ", false).toUpperCase();
                if (!genero.equals("M") && !genero.equals("F"))
                    throw new Exception();
                break;

            } catch (Exception e) {
                General.imprimir("-- Ingrese un genero valido --");
            }
        }
        General.imprimir("");

        char pMayuscula = Character.toUpperCase(nombre.charAt(0));
        nombre = pMayuscula + nombre.substring(1);

        Trabajador nTrabajador = new Trabajador(nombre, cedula, salario, genero);
        Nodo nNodo = new Nodo(nTrabajador);

        if (vacio()) {
            cola = nNodo;
            cabeza.siguiente = cola;
            cabeza.anterior = cola;
            cola.siguiente = cabeza;
            cola.anterior = cabeza;

            return;
        }

        Nodo aux = cabeza.siguiente;
        String auxName, nName;
        nName = nNodo.trabajador.getNombre();

        while (aux != cabeza) {

            auxName = aux.trabajador.getNombre();

            if (nName.compareTo(auxName) <= 0) {

                nNodo.siguiente = aux;
                nNodo.anterior = aux.anterior;
                aux.anterior.siguiente = nNodo;
                aux.anterior = nNodo;

                return;
            }

            aux = aux.siguiente;
        }

        nNodo.siguiente = cabeza;
        nNodo.anterior = cola;
        cola.siguiente = nNodo;
        cabeza.anterior = nNodo;
        cola = nNodo;

    }

    public static int buscar(String cc) throws IOException {

        Nodo aux = cabeza.siguiente;
        String auxCC;
        int contador = 0;

        while (aux != cabeza) {

            auxCC = aux.trabajador.getCedula();

            if (auxCC.equals(cc))
                return contador;

            contador++;
            aux = aux.siguiente;
        }

        return -1;

    }

    public static void eliminar() throws IOException {

        if (vacio()) {
            General.imprimir("-- No hay trabajadores registrados --\n");
            return;
        }

        // El metodo leer verifica que el contenido sea un entero y lo devuelve, luego
        // lo volvemos string nuevamente
        String ccEliminar = General.leer("Ingrese la cedula del empleado a eliminar: ") + "";

        int posicion = buscar(ccEliminar);

        if (posicion == -1) {
            General.imprimir("-- No se encontro el trabajador solicitado --");
            return;
        }

        Nodo aux = cabeza.siguiente;

        for (int i = 0; i < posicion; i++) {
            aux = aux.siguiente;
        }

        aux.anterior.siguiente = aux.siguiente;
        aux.siguiente.anterior = aux.anterior;
        General.imprimir("-- El trabajador fue eliminado correctamente --");

    }

    public static void imprimir() throws IOException {

        if (vacio()) {
            General.imprimir("\n -- No se encuentran trabajadores registrados -- \n");
            return;
        }

        String decision = General
                .leer("-- De que manera desea imprimir la lista: \n\t 1.Ascendentemente\n\t 2.Descendentemente", true);

        if (decision.equals("1")) {

            Nodo aux = cabeza.siguiente;
            int cont = 1;

            General.imprimir("--- TRABAJADORES ---", true);

            while (aux != cabeza) {
                General.imprimir(
                        "   " + cont + "." + aux.trabajador.getNombre() + "\t" + "Cedula: " + aux.trabajador.getCedula()
                                + "\tSalario: $" + aux.trabajador.getSalario(),
                        true);
                aux = aux.siguiente;
                cont++;
            }

        } else if (decision.equals("2")) {

            Nodo aux = cola;
            int cont = 1;

            General.imprimir("--- TRABAJADORES ---", true);

            while (aux != cabeza) {
                General.imprimir(
                        "   " + cont + "." + aux.trabajador.getNombre() + "\t" + "Cedula: " + aux.trabajador.getCedula()
                                + "\tSalario: $" + aux.trabajador.getSalario(),
                        true);
                aux = aux.anterior;
                cont++;
            }

        }else{
            General.imprimir("Ingrese una opcion valida");
            imprimir();
        }

        General.imprimir("");

    }

    // CONSULTAR: Suma de los saldos - Saldo promedio - Cuantos saldo rojo o
    // negativo - Cuantos saldo positivo - El menor y el mayor saldo

    public static double opSalarios(int operacion) {

        if (vacio()) {
            General.imprimir("\n -- No se encuentran trabajadores registrados -- \n");
            return 0;
        }

        Nodo aux = cabeza.siguiente;
        double nomina = 0;
        int contador = 1;

        while (aux != cabeza) {

            nomina = nomina + aux.trabajador.getSalario();
            aux = aux.siguiente;
            contador++;
        }

        if (operacion == 1) {
            return nomina;
        }

        return nomina / contador;

    }

    public static void saldoMyM(String op) {

        if (vacio()) {
            General.imprimir("\n -- No se encuentran trabajadores registrados -- \n");
            return;
        }

        Nodo aux = cabeza.siguiente;
        Trabajador saldoMayor = null;
        Trabajador saldoMenor = null;
        double sMayor = 0;

        while (aux != cabeza) {

            if (aux.trabajador.getSalario() > sMayor) {

                sMayor = aux.trabajador.getSalario();
                saldoMayor = aux.trabajador;

            }
            aux = aux.siguiente;
        }

        if (op.equalsIgnoreCase("MAYOR")) {

            General.imprimir("\n-- El trabajador con mayor salario es: \n"
                    + "\t Nombre: " + saldoMayor.getNombre()
                    + "\t CC: " + saldoMayor.getCedula()
                    + "\t Genero: " + saldoMayor.getGenero()
                    + "\t Salario: " + saldoMayor.getSalario());

        } else if (op.equalsIgnoreCase("MENOR")) {

            aux = cabeza.siguiente;

            while (aux != cabeza) {

                if (aux.trabajador.getSalario() < sMayor) {

                    sMayor = aux.trabajador.getSalario();
                    saldoMenor = aux.trabajador;

                }
                aux = aux.siguiente;
            }

            General.imprimir("\n-- El trabajador con menor salario es: \n"
                    + "\t Nombre: " + saldoMenor.getNombre()
                    + "\t Salario: " + saldoMenor.getSalario());
        }

    }

    public static void saldosPyN() {

        if (vacio()) {
            General.imprimir("\n -- No se encuentran trabajadores registrados -- \n");
            return;
        }

        Nodo aux = cabeza.siguiente;
        int positivos = 0;
        int negativos = 0;
        double prom = opSalarios(2);

        while (aux != cabeza) {

            if (aux.trabajador.getSalario() > prom)
                positivos++;
            else
                negativos++;

            aux = aux.siguiente;
        }

        General.imprimir("\n -- Balance salarios -- \n\n-- Ganan mas que el promedio : " + positivos);
        General.imprimir("-- Ganan menos que el promedio: " + negativos);

    }

}
