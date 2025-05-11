import React, { useState, useEffect, useRef } from 'react';

export function Instagram() {
    const access_token = "1364139411507782|7wSJ9h_RPv_eEcOBmXCYvooNRws"
    const url = "https://graph.instagram.com/v22.0/me?fields=id,media_type,media_url,caption,timestamp&access_token=" + access_token ;

    async function fetchInstas() {
        console.log("Fetching Instagram Images");
        try {
          const instaPromise = await fetch(url, {
            method: 'GET'
          });
          const response = await instaPromise.json();
          console.log(response);
          // setData(await response.body);
        } catch (err) {
          console.log("Error : ", err);
        }
      }
      useEffect(() => {
        fetchInstas();
      }, []);
}

/* 
https://developers.facebook.com/apps/
https://business.facebook.com/latest/settings/business_users/?business_id=1201193775137426
https://developers.facebook.com/tools/explorer
*/