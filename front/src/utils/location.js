function callFlutter() {
  if (window.flutter_inappwebview) {
    window.flutter_inappwebview
      .callHandler("flutterFunction", 123)
      .then(function (result) {
        console.log(123);
        console.log("Result from Flutter:", result);
        return result;
      });
  }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

let data = {};

function success(pos) {
  const crd = pos.coords;

  console.log({
    latitude: crd.latitude,
    longitude: crd.longitude,
    accuracy: crd.accuracy,
  });
  data = {
    latitude: crd.latitude,
    longitude: crd.longitude,
    accuracy: crd.accuracy,
  };
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function GetLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    // console.log(position);
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { GetLocation };
export { callFlutter };
