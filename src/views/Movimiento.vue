<template>
    <div class="form">
        <h2>Añadir Gasto o Ingreso</h2>

        <form v-on:submit.prevent="guardarMovimiento">
            <div>
                <label>Tipo:</label>
                <select v-model="tipo" required>
                    <option value="gasto">Gasto</option>
                    <option value="ingreso">Ingreso</option>
                </select>
            </div>

            <div>
                <label>Concepto:</label>
                <input v-model="concepto" required />
            </div>

            <div>
                <label>Cantidad:</label>
                <input v-model.number="cantidad" type="number" step="any" required />
            </div>

            <div>
                <label>Fecha:</label>
                <input v-model="fecha" type="date" required />
            </div>

            <button type="submit">Guardar</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Movimiento',
    data() {
        return {
            tipo: '',
            concepto: '',
            cantidad: null,
            fecha: '',
            movimientos: [],
            editIndex: null
        }
    },
    mounted() {
        const guardados = localStorage.getItem('movimientos');
        if (guardados) {
            this.movimientos = JSON.parse(guardados);
        }
        const index = this.$route.query.editIndex;
        if (index != undefined){
            const movimiento = this.movimientos[index];
            if(movimiento){
                this.tipo = movimiento.tipo;
                this.concepto = movimiento.concepto;
                this.cantidad = movimiento.cantidad;
                this.fecha = movimiento.fecha;
                this.editIndex = index;
            }
        }
    },
    methods: {
        guardarMovimiento() {
            if (!this.concepto || this.cantidad === null || !this.fecha) return;

            const nuevoMovimiento = {
                tipo: this.tipo,
                concepto: this.concepto,
                cantidad: this.cantidad,
                fecha: this.fecha
            };

            let movimientosGuardados = JSON.parse(localStorage.getItem('movimientos'));
            
            if(this.editIndex !== null){
                movimientosGuardados[this.editIndex] = nuevoMovimiento;
            }else{
                movimientosGuardados.unshift(nuevoMovimiento);
            }
            localStorage.setItem('movimientos', JSON.stringify(movimientosGuardados));

            this.tipo = '';
            this.concepto = '';
            this.cantidad = null;
            this.fecha = '';
            this.editIndex = null;
            this.$router.push('/listado');
        }
}
}
</script>


<style scoped>
.form {
    max-width: 400px;
    margin: 30px auto;
    padding: 50px;
    background: #f9f9f9;
    border-radius: 10px;
}

.form h2 {
    text-align: center;
}

.form label {
    font-weight: bold;
}

.form input {
    width: 100%;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 5px;
}

.form button {
    padding: 10px 30px;
    background: rgb(90, 187, 90);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

.form button:hover {
    background: green;
}

.form select {
    cursor: pointer;
    width: 100%;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 5px;
}
</style>