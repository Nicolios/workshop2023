<template>
        <GoogleMap api-key="AIzaSyDJb-W75KYY_qtHYpJiD9cEfEsLQikupZQ" style="width: 1250px; height: 650px" :center="center" :zoom="13">
<!--        <Marker :options="{ position: center }" />-->
    </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
    components: { GoogleMap, Marker },
    setup() {
        const center = { lat: 43.6091036, lng: 3.8801855 };

        return { center };
    },
});
</script>