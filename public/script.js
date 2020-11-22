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
            url: 'http://localhost:3000/poista/' + id,
            type: "delete",
            success: (result) => {
                alert("Poisto onnistui!")
                hae();
            }
        });
    }

    muokkaa = function () {
        $.ajax({
            url: "http://localhost:3000/muokkaa",
            type: "put",
            data: {
                id: $("#mid").val(),
                nimi: $("#mnimi").val(),
                osoite: $("#mosoite").val(),
                postinro: $("#mpostinro").val(),
                postitmp: $("#mpostitmp").val(),
                avain: $("#mavain").val()
            },
            success: (result) => {
                console.log(result);
                if (result === "200") {
                    alert("MUOKKAUS ONNISTUI!");
                    $("#dialog").dialog("close");
                    hae();
                } else {
                    alert("MUOKKAUS EI ONNISTUNUT, KAIKISSA KENTISSÄ PITÄÄ OLLA TIETO!");
                }
            }
        })

    }


    avaaDialog = function (id) {
        var id = id;
        console.log(id);
        $("#mid").val(id);
        $("#dialog").dialog();
        haeTiedotDialogiin(id);
    }


    $("#searchBtn").click(() => {
        hae();
    });

    $("#lisaaBtn").click(() => {
        lisaa();
    });

    //haetaan tiedot dialogiin
    haeTiedotDialogiin = function (id) {
        console.log('hakeetietoja');
        $.get({
            url: `http://localhost:3000/haeDialogi`,
            data: {
                avain: id
            },
            success: (result) => {
                showInDialog(result);
            }
        })
    }
});
//dialogin elementteihin tietojenvienti
showInDialog = (result) => {
    result.forEach((element) => {
        $("#mnimi").val(element.nimi);
        $("#mosoite").val(element.osoite);
        $("#mpostinro").val(element.postinro);
        $("#mpostitmp").val(element.postitmp);
        $("#mavain").val(element.asty_avain);
    })
}

//tableen tietojenvienti
showResultInTable = (result) => {
    result.forEach((element) => {
        let trstr = "<tr><td>" + element.NIMI + "</td>\n";
        trstr += "<td>" + element.OSOITE + "</td>\n";
        trstr += "<td>" + element.POSTINRO + "</td>\n";
        trstr += "<td>" + element.POSTITMP + "</td>\n";
        trstr += "<td>" + element.LUONTIPVM + "</td>\n";
        trstr += "<td>" + element.ASTY_AVAIN + "</td>";
        trstr +=
            "<td><button class='btn btn-danger' value=" +
            element.AVAIN +
            " onclick=poista(" +
            element.AVAIN +
            ")>" +
            "poista" +
            "</button></td>";
        trstr +=
            "<td><button class='btn btn-warning' value=" +
            element.AVAIN +
            " onclick=avaaDialog(" +
            element.AVAIN +
            ")>" +
            "muokkaa" +
            "</button></td>";
        trstr += "</tr>\n";
        $("#data tbody").append(trstr);
    });
};
