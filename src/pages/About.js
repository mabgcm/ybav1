import React from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/Card';
import Mb from '../assets/mb.jpeg'

const About = () => {
  return (
    <div className="container">
      <div className="row mx-auto">
        <div className='col-4'>
          <Card>
            <Card.Body>
              <Card.Title>Yöntembilimin Kurucusu</Card.Title>
              <Card.Img src={Mb} />
              <Card.Text>
                Mustafa Buğucam 1952 yılında Niğe'de doğdu. Çeşitli il ve ilçelerde Cumhuriyet Savcı Yardımcılığı yaptı. Bilahere Kültür Bakanlığı Hukuk Müşavirilği'ne geçti. Bu kamusal  görevlerden sonra 2003 yılından itibaren Noterlik (Yazerlik) yapmaya başladı. 2017 yılında emekli oldu. Profesyonel olarak hukukçuluk yaparken amatör olarak bilim, felsefe ve din ile uğraştı. Amatör Bilgisayar Yazılımı ve Astronomi ile iştigal etti. Evli ve üç çocuk babasıdır. 1990 dan beri YBA inşa etmeye çalışmaktadır.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='col-8'>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '3rem' }}>Yontembilim Nedir?</Card.Title>
              <Card.Text style={{ fontSize: '2rem', lineHeight: '2.88rem' }}>
                Yöntem konusunda ilk çalışma Aristotales’in ORGANON adlı yapıtıdır. Bu konuda ikinci gelişme SENTETİK ispatlanabilir  hendeseyi ANALİTİK hesaplanabilir geometriye geçiren Descartes’ın MATEMATİKSEL  koordinatlarıdır. YÖNTEM BİLİMSEL ANALİZ, «matematiksel» olarak kullanılan analitik düzlemi  «metodik» hale getirerek onu hızlı bir anlam SÜRÜCÜ  ve kolay  bir anlatım AYGITI  yapmıştır.  Bu çalışmada  METODİK  kullanımın  normları, formları, nosyonları ve modelleri anlatılmıştır. Metodik kullanma yaygınlaştığında ortaya çıkan görsel modellemenin  felsefe ile din arasında KAVRAMSAL TASARIMI yapmaya aday ortak bir dile imkan vereceği düşünülmüştür.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
