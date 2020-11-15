$(document).ready(function () {
    haeTyypit()
    function haeTyypit() {
        $.get(
            {
                url: `http://localhost:3000/Tyypit`,
                success: (result) => {
                    result.forEach(element => {
                        var optionstring = "<option value='" + element.Avain + "'>" + element.Lyhenne + " - " + element.Selite + "</option>"
                        $(".avain").append(optionstring);
                    });
                }
            }
        )
    }
    hae = () => {
        $("tbody").empty();
        $.get({
            url: `http://localhost:3000/haeAsiakkaat`,
            data: {
                nimi: $("#nimi").val(),
                osoite: $("#osoite").val(),
                avain: $("#avain").val()
            },
            success: (result) => {
                showResultInTable(result);
            },
        });
    };

    lisaa = () => {
        $("tbody").empty();
        $.post({
            url: `http://localhost:3000/lisaa`,
            data: {
                nimi: $("#lnimi").val(),
                osoite: $("#losoite").val(),
                postinro: $("#lpostinro").val(),
                postitmp: $("#lpostitmp").val(),
                avain: $("#lavain").val()
            },
            success: (result) => {
                console.log(result);
                if (result === "200") {
                    alert("LISÄYS ONNISTUI!");
                    hae();
                } else {
                    alert("LISÄYS EI ONNISTUNUT, TIEDOT PITÄÄ TÄYTTÄÄ OIKEIN!");
                    hae();
                }
            },
        });
    };

    poista = (id) => {
        $.ajax({
            url: 'http://localhost:3000/poista/'+id,
            type: "delete",
            // data: {
            //     avain: (id)
            // },
            success: (result) => {
                alert("Poisto onnistui!")
                hae();
            }
        });
    }

    $("#searchBtn").click(() => {
        hae();
    });

    $("#lisaaBtn").click(() => {
        lisaa();
    });

    $("#poistaBtn").click((id) => {
        id = $(this).val();
        poista();
    });
});

showResultInTable = (result) => {
    result.forEach((element) => {
        let trstr = "<tr><td>" + element.NIMI + "</td>\n";
        trstr += "<td>" + element.OSOITE + "</td>\n";
        trstr += "<td>" + element.POSTINRO + "</td>\n";
        trstr += "<td>" + element.POSTITMP + "</td>\n";
        trstr += "<td>" + element.LUONTIPVM + "</td>\n";
        trstr += "<td>" + element.ASTY_AVAIN + "</td>";
        trstr +=
            "<td><button class='btn btn-warning' 'poistaBtn' value=" +
            element.AVAIN +
            " onclick=poista(" +
            element.AVAIN +
            ")>" +
            "poista" +
            "</button></td>";
        trstr += "</tr>\n";
        $("#data tbody").append(trstr);
    });
};
