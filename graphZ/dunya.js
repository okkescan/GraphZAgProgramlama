
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOGM4ZTVjOC03ZGQxLTQ5N2MtYTExZi1hYmVmZDU5OTEwY2MiLCJpZCI6MjE2NDI2LCJpYXQiOjE3MTYxOTk3NDJ9.Jal3gH3-fxyY6-26TXLCKx5CbxD-N2N2bWrDSsXdVmw';
    // Initialize Cesium Viewer
    // Initialize the CesiumJS viewer
    const viewer = new Cesium.Viewer('cesiumContainer', {
      animation:false,
      timeline:false,
        
    });
    
 
 // JSON verisi
const data = {
    "nodes": [
        { "id": "1", "name": "Harvard University", "type": "university", "latitude": 42.3736, "longitude": -71.1097 },
        { "id": "2", "name": "Massachusetts Institute of Technology", "type": "university", "latitude": 42.3601, "longitude": -71.0942 },
        { "id": "3", "name": "Stanford University", "type": "university", "latitude": 37.4275, "longitude": -122.1697 },
        { "id": "4", "name": "University of Oxford", "type": "university", "latitude": 51.7588, "longitude": -1.2557 },
        { "id": "5", "name": "University of Cambridge", "type": "university", "latitude": 52.2043, "longitude": 0.1149 },
        { "id": "6", "name": "Boğaziçi Üniversitesi", "type": "university", "latitude": 41.0853, "longitude": 29.0454 },
        { "id": "7", "name": "Orta Doğu Teknik Üniversitesi", "type": "university", "latitude": 39.8956, "longitude": 32.7778 },
        { "id": "8", "name": "Fırat Üniversitesi", "type": "university", "latitude": 38.677796009521686,"longitude": 39.20191157802797},
        {"id": "9", "name": "Moscow State University", "type": "university", "latitude": 55.70410076960623, "longitude": 37.52901041907946},
        {"id": "10", "name": "Sao Paulo University", "type": "university", "latitude": -23.561062687757378, "longitude": -46.730449909797684},
        {"id": "11", "name": "Tomsk State University", "type": "university", "latitude":56.46959479568743, "longitude": 84.94747008195297},
        {"id": "12", "name": "Porto University", "type": "university", "latitude": 41.14659634606619, "longitude": -8.615742718964405},
        {"id": "13", "name": "Brassilia University", "type": "university", "latitude": -15.763033341568082, "longitude": -47.87058821477258},
        {"id": "14", "name": "Lisbon University", "type": "university", "latitude": 38.752766541906475, "longitude": -9.158202088404682},
        {"id": "15", "name": "Istanbul Technical University", "type": "university", "latitude": 41.10581234354524, "longitude": 29.025608317257095}
    ],
    "edges": [
        { "source": "1", "target": "United States" },
        { "source": "2", "target": "United States" },
        { "source": "3", "target": "United States" },
        { "source": "4", "target": "United Kingdom" },
        { "source": "5", "target": "United Kingdom" },
        { "source": "6", "target": "Turkey" },
        { "source": "7", "target": "Turkey" },
        { "source": "8", "target": "Turkey" },
        {"source": "9", "target": "Russia"},
        {"source": "10", "target": "Brasil"},
        {"source": "11", "target": "Russia"},
        {"source": "12", "target": "Portugal"},
        {"source": "13", "target": "Brasil"},
        {"source": "14", "target": "Portugal"},
        {"source": "15", "target": "Turkey"},




    ]
};

// Başkentler
const capitals = {
    "United States": { "latitude": 38.8951, "longitude": -77.0364 },
    "United Kingdom": { "latitude": 51.5074, "longitude": -0.1278 },
    "Turkey": { "latitude": 39.9334, "longitude": 32.8597 },
    "Russia": {"latitude": 55.75529886842875, "longitude": 37.58861634629634},
    "Brasil": {"latitude": -15.79164012456966, "longitude": -47.886071388985066},
    "Portugal" : {"latitude": 38.72208965053183, "longitude": -9.14257331348587}
};

    // Düğümleri ve kenarları ekleme
    data.nodes.forEach(node => {
        viewer.entities.add({
            name: node.name,
            position: Cesium.Cartesian3.fromDegrees(node.longitude, node.latitude),
            point: {
                pixelSize: 18,
                color: Cesium.Color.BLUE
            }
        });
    
        // Üniversitelerin bağlı olduğu ülkenin başkentini bulma ve kenar ekleme
        const edge = data.edges.find(edge => edge.source === node.id);
        if (edge) {
            const capital = capitals[edge.target];
            if (capital) {
                viewer.entities.add({
                    polyline: {
                        positions: [
                            Cesium.Cartesian3.fromDegrees(node.longitude, node.latitude),
                            Cesium.Cartesian3.fromDegrees(capital.longitude, capital.latitude)
                        ],
                        width: 2,
                        material: Cesium.Color.RED
                    }
                });
            }
        }
    });
    
    // Kamerayı bir konuma uçurma
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-71.1097, 42.3736, 10000000),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-45.0),
            roll: 0.0,
        },
        duration: 3
    });