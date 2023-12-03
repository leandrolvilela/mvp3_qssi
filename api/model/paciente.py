from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base

class Paciente(Base):
    __tablename__ = 'pacientes'
    
    id                       = Column(Integer, primary_key=True)
    name                     = Column("name", String(50))
    age                      = Column("age", Integer)
    anaemia                  = Column("anaemia", Integer)
    creatinine_phosphokinase = Column("creatinine_phosphokinase", Integer)
    diabetes                 = Column("diabetes", Integer)
    ejection_fraction        = Column("ejection_fraction", Integer)
    high_blood_pressure      = Column("high_blood_pressure", Integer)
    platelets                = Column("platelets", Integer)
    sex                      = Column("sex", Integer)
    serum_creatinine         = Column("serum_creatinine", Float)
    serum_sodium             = Column("serum_sodium", Float)
    smoking                  = Column("smoking", Integer)
    time                     = Column("time", Integer)
    outcome                  = Column("outcome", Integer, nullable=True)
    data_insercao            = Column(DateTime, default=datetime.now())
    
    def __init__(self, name:str, age:int, anaemia:int, creatinine_phosphokinase:int, 
                 diabetes:int, ejection_fraction:int, high_blood_pressure:float, 
                 platelets:float, sex:int, serum_creatinine:float, serum_sodium:float,
                 smoking:float, time:int, outcome:int, data_insercao:Union[DateTime, None] = None):
        """
        Cria um Paciente

        Arguments:
        name: nome do paciente
        - age:  								
        - anaemia: 							
        - creatinine phosphokinase  (CPK): 	
        - diabetes: 						
        - ejection fraction: 				
        - high blood pressure: 				
        - platelets: 						
        - sex: 								
        - serum creatinine: 				
        - serum sodium: 					
        - smoking: 							
        - time:
        - outcome: diagnóstico
        - data_insercao: data de quando o paciente foi inserido à base
        """
        self.name                     = name
        self.age                      = age
        self.anaemia                  = anaemia
        self.creatinine_phosphokinase = creatinine_phosphokinase
        self.diabetes                 = diabetes
        self.ejection_fraction        = ejection_fraction
        self.high_blood_pressure      = high_blood_pressure
        self.platelets                = platelets
        self.sex                      = sex
        self.serum_creatinine         = serum_creatinine
        self.serum_sodium             = serum_sodium
        self.smoking                  = smoking
        self.time                     = time
        self.outcome                  = outcome

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao