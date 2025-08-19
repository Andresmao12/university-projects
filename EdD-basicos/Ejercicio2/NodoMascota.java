package Ejercicio2;

public class NodoMascota {
    private String codigo;
    private String nombre;
    public NodoMascota anterior, siguiente;

    public NodoMascota(String codigo, String nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
