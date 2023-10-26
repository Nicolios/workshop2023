<template>
    <h2>Trouver mon food-truck eco-responsable</h2>
    <div>
        <input type="range" id="distance" name="distance" min="0" max="100" />
        <label for="distance">Distance <span id="distanceValue">0</span></label>
    <div style="margin-left: 20px">
        <div class="d-flex gap-2">
            <input id="pi_input" type="range" class="form-range" min="0" max="1000" step="1" />
            <p>Rayon: <output id="value"></output></p>
        </div>
        <button @click="getData" class="btn btn-success">Rechercher</button>
    </div>
    <div class="map">
        <GoogleMap api-key="AIzaSyDJb-W75KYY_qtHYpJiD9cEfEsLQikupZQ" style="height: 500px; width: 775px;" :center="center" :zoom="13" id="maps">
            <Marker
                v-for="(truck, index) in trucks"
                :key="index"
                :options="{
                    position: { lat: Number(truck.lat), lng: Number(truck.lon) },
                    icon: getColoredMarker(getColorByGrade(truck.note))
                }"
            />
        </GoogleMap>
    </div>
    
</template>

<style>
    h2{
        margin-top: 25px !important;
        text-align: center;
    }
    .map {
        display: flex;
        margin: 0% 5% 5% 5%;
        justify-content: center;
    }
</style>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import axios from "axios";

export default defineComponent({
    components: { GoogleMap, Marker },
    data(){
        return {
            trucks: [],
            gradeColors: {
                'A': '#00FF00',
                'B': '#ADFF2F',
                'C': '#FFFF00',
                'D': '#FFA500',
                'E': '#FF0000'
            }
        }
    },
    mounted() {
        this.getData()
        const value = document.querySelector("#value");
        const input = document.querySelector("#pi_input");
        value.textContent = input.value;
        input.addEventListener("input", (event) => {
            value.textContent = event.target.value;
        });
    },
    setup() {
        const center = { lat: 43.6091036, lng: 3.8801855 };

        return { center };
    },
    methods: {
        getData(){
            axios
                .get(import.meta.env.VITE_API_URL+'trucks', {
                    headers: {
                        lat: 43.6091036,
                        lon: 3.8801855,
                        rayon: this.rayon,
                    }
                })
                .then((response) => {
                    this.trucks = response.data
                    console.log(response.data)
                    console.log(import.meta.env.VITE_API_URL)
                }).catch((error) => {
                    console.log(error)
                })
        },
        getColoredMarker(color) {
            return {
                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#000000',
                scale: 1.5
            };
        },
        getColorByGrade(grade) {
            return this.gradeColors[grade] || '#000000'; // Default to black if grade is not found
        }
    },
    computed: {
        rayon(){
            const input = document.querySelector("#pi_input");
            return input.value;
        }
    }
});
</script>

<style>
.input-rayon{
    display: flex;
    gap: 10px;
}
.form-range{
    max-width: 250px;
}
</style>