<template>
    <div>
        <input type="range" id="distance" name="distance" min="0" max="100" />
        <label for="distance">Distance <span id="distanceValue">0</span></label>
    </div>
    <GoogleMap api-key="AIzaSyDJb-W75KYY_qtHYpJiD9cEfEsLQikupZQ" style="width: 1250px; height: 650px" :center="center" :zoom="13">
    <Marker
        v-for="(truck, index) in trucks"
        :key="index"
        :options="{
            position: { lat: Number(truck.lat), lng: Number(truck.lon) },
            icon: getColoredMarker(getColorByGrade(truck.note))
        }"
    />
</GoogleMap>
</template>

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
                        rayon: 1000,
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
        changeValue(){
            const distanceInput = document.getElementById('distance');
            const distanceValue = document.getElementById('distanceValue');

            // Update the initial value
            distanceValue.textContent = distanceInput.value;

            // Attach event listener
            distanceInput.addEventListener('input', function() {
                distanceValue.textContent = this.value;
            });
        }
    }
});
</script>