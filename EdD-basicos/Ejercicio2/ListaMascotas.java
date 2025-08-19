package Ejercicio2;

public class ListaMascotas {
    private NodoMascota primero, ultimo;

    public NodoMascota getPrimero() {
        return primero;
    }

    public boolean vacio() {
        return primero == null && ultimo == null;
    }

    public void insertar(NodoMascota nuevo) {
        if (vacio()) {
            primero = nuevo;
            ultimo = nuevo;
        } else {
            ultimo.siguiente = nuevo;
            nuevo.anterior = ultimo;
            ultimo = nuevo;
        }
    }

    public void eliminar(String codigo) {
        if (vacio()) {
            System.out.println("No hay mascotas registradas");
            return;
        }

        NodoMascota actual = primero;
        while (actual != null) {
            if (actual.getCodigo().equals(codigo)) {
                if (actual == primero) {
                    primero = actual.siguiente;
                    if (primero != null) {
                        primero.anterior = null;
                    } else {
                        ultimo = null;
                    }
                } else if (actual == ultimo) {
                    ultimo = actual.anterior;
                    ultimo.siguiente = null;
                } else {
                    actual.anterior.siguiente = actual.siguiente;
                    actual.siguiente.anterior = actual.anterior;
                }
                System.out.println("Mascota eliminada: " + codigo);
                return;
            }
            actual = actual.siguiente;
        }
        System.out.println("Mascota no encontrada: " + codigo);
    }

    public void modificar(String codigo, String nuevoNombre) {
        NodoMascota actual = primero;
        while (actual != null) {
            if (actual.getCodigo().equals(codigo)) {
                actual.setNombre(nuevoNombre);
                System.out.println("Mascota modificada: " + codigo);
                return;
            }
            actual = actual.siguiente;
        }
        System.out.println("Mascota no encontrada: " + codigo);
    }

    public NodoMascota buscarPorCodigo(String codigo) {
        NodoMascota actual = primero;
        while (actual != null) {
            if (actual.getCodigo().equals(codigo)) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    public NodoMascota buscarPorNombre(String nombre) {
        NodoMascota actual = primero;
        while (actual != null) {
            if (actual.getNombre().equalsIgnoreCase(nombre)) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    public String listarMascotas() {
        StringBuilder sb = new StringBuilder();
        NodoMascota actual = primero;
        while (actual != null) {
            sb.append("Código: ").append(actual.getCodigo())
                    .append(", Nombre: ").append(actual.getNombre()).append("\n");
            actual = actual.siguiente;
        }
        return sb.toString();
    }
}
